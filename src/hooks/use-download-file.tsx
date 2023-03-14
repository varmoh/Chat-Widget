import React, { forwardRef, useImperativeHandle, useLayoutEffect, useState } from 'react';

export interface DownloadHandle {
  download: (params: { title: string; data?: Blob }) => void;
}

export const Download = forwardRef<DownloadHandle, {}>((props, ref) => {
  const linkRef = React.useRef<HTMLAnchorElement>(null);
  const [download, setDownload] = useState<{ title: string; data: Blob }>();
  useImperativeHandle(ref, () => ({
    download: (params) => {
      if (params.data) {
        setDownload(params as typeof download);
      }
    },
  }));

  useLayoutEffect(() => {
    if (download) {
      linkRef?.current?.click();
    }
    setDownload(undefined);
  }, [download]);

  if (!download) {
    return null;
  }
  const { title, data } = download;
  return <a href={window.URL.createObjectURL(data)} download={title} ref={linkRef} />;
});

export type DownloadElement = React.ElementRef<typeof Download>;