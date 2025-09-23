import React, { useState, useEffect, useRef, useCallback } from "react";
import Markdownify from "./Markdownify";

interface SmoothStreamingMessageProps {
  message: string;
  isStreaming: boolean;
  sanitizeLinks?: boolean;
  typingSpeed?: number;
  batchSize?: number;
  onComplete?: () => void;
}

const SmoothStreamingMessage: React.FC<SmoothStreamingMessageProps> = ({
  message,
  isStreaming,
  sanitizeLinks = false,
  typingSpeed = 30,
  batchSize = 2,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const tokenBuffer = useRef("");
  const displayIndex = useRef(0);
  const typewriterInterval = useRef<NodeJS.Timeout | null>(null);
  const previousMessage = useRef("");
  const isNewStream = useRef(true);

  useEffect(() => {
    if (isNewStream.current || !message.startsWith(previousMessage.current)) {
      setDisplayedText("");
      tokenBuffer.current = message;
      displayIndex.current = 0;
      isNewStream.current = false;

      if (typewriterInterval.current) {
        clearInterval(typewriterInterval.current);
        typewriterInterval.current = null;
      }
      startTypewriting();
    }
    else if (message.length > tokenBuffer.current.length) {
      tokenBuffer.current = message;

      if (
        !typewriterInterval.current &&
        tokenBuffer.current.length > displayIndex.current
      ) {
        startTypewriting();
      }
    }
    else if (message.length < tokenBuffer.current.length) {
      tokenBuffer.current = message;
      if (displayIndex.current > message.length) {
        displayIndex.current = message.length;
        setDisplayedText(message);
      }
    }

    previousMessage.current = message;
  }, [message]);

  useEffect(() => {
    if (!isStreaming) {
      isNewStream.current = true;
    }
  }, [isStreaming]);

  const startTypewriting = useCallback(() => {
    if (typewriterInterval.current) return;

    typewriterInterval.current = setInterval(() => {
      const buffer = tokenBuffer.current;
      const currentIndex = displayIndex.current;

      if (currentIndex >= buffer.length) {
        if (!isStreaming) {
          clearInterval(typewriterInterval.current!);
          typewriterInterval.current = null;
        }
        return;
      }

      const nextIndex = Math.min(currentIndex + batchSize, buffer.length);
      const newText = buffer.slice(0, nextIndex);

      setDisplayedText(newText);
      displayIndex.current = nextIndex;

      if (nextIndex >= buffer.length && !isStreaming) {
        clearInterval(typewriterInterval.current!);
        typewriterInterval.current = null;
        
      }
    }, typingSpeed);
  }, [isStreaming, batchSize, typingSpeed]);

  useEffect(() => {
    if (
      !isStreaming &&
      displayedText.length === message.length &&
      typewriterInterval.current
    ) {
      clearInterval(typewriterInterval.current);
      typewriterInterval.current = null;
      onComplete?.();
    }
  }, [isStreaming, displayedText.length, message.length]);

  useEffect(() => {
    return () => {
      if (typewriterInterval.current) {
        clearInterval(typewriterInterval.current);
      }
    };
  }, []);

  if (!isStreaming && displayedText.length === message.length) {
    return <Markdownify message={message} sanitizeLinks={sanitizeLinks} />;
  }

  return (
    <div className="smooth-streaming-message">
      <Markdownify message={displayedText} sanitizeLinks={sanitizeLinks} />
    </div>
  );
};

export default SmoothStreamingMessage;
