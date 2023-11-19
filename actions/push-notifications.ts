interface PushNotifications {
  send: (url: string) => void;
  recieve: (nextSignKey: string, currentSignKey: string) => void;
}

export const PushNotifications: PushNotifications = {
  send(url) {

  },
  recieve(nextSignKey, currentSignKey) {
    
  },
}