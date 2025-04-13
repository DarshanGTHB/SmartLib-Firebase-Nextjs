import toast from "react-hot-toast";

export const toastNeutral = (message) => {
  toast(message, {
    icon: 'ℹ️',
    style: {
      border: '1px solid #facc15',
      background: '#fef9c3',
      color: '#92400e',
    },
  });
};
