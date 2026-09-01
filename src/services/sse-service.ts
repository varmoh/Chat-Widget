const sse = <T>(url: string, onMessage: (data: T) => void): EventSource => {
  const eventSource = new EventSource(
    `${window._env_.NOTIFICATION_NODE_URL}/public/v1/notifications/events?chatUuid=dee9c8da-2b40-4c6a-a31e-db278b6960b1`
  );

  eventSource.onmessage = (event: MessageEvent) => {
    const response = JSON.parse(event.data);

    if (response != undefined) {
      onMessage(response);
    }
  };

  eventSource.onopen = () => {
    console.log("SSE connection opened, url:", url);
  };

  eventSource.onerror = () => {};

  return eventSource;
};

export default sse;
