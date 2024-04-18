const sse = <T>(url: string, onMessage: (data: T) => void): EventSource => {
  const eventSource = new EventSource(
    `${window._env_.NOTIFICATION_NODE_URL}/sse${url}`
  );

  eventSource.onmessage = (event: MessageEvent) => {
    const response = JSON.parse(event.data);

    if (response != undefined) {
      onMessage(Object.values(response)[0] as T);
    }
  };

  eventSource.onopen = () => {
    console.log("SSE connection opened, url:", url);
  };

  eventSource.onerror = () => {
    // console.error('SSE error, url:', url); // Uncomment this line to see the error in the console
  };

  return eventSource;
};

export default sse;
