export default () => {
  // 监听主线程的调用通知
  self.addEventListener(
    'message',
    function (e) {
      const { type, during = 5000 } = e.data;
      let timer;
      const refreshTime = (_during: number) => {
        timer = setTimeout(() => {
          self.postMessage(type);
        }, _during);
      };

      if (type !== 'clear') {
        refreshTime(during);
      } else {
        clearTimeout(timer);
        self.close();
      }
    },
    false,
  );
};
