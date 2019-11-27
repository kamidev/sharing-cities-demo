class Subscription {
  sub() {
    throw new Error(`Subscription has not defined sub`);
  }

  unsub() {
    throw new Error(`Subscription has not defined unsub`);
  }
};

export default Subscription;
