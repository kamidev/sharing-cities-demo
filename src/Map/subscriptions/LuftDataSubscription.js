import axios from 'axios';
import Subscription from './Subscription';

async function getData() {
  try {
    const response = await axios.get('http://api.luftdaten.info/v1/filter/area=59.305477,18.105203,0.50');
    console.log(response);
  } catch (error) {
    throw new Error(error);
  }
}

class LuftDataSubscription extends Subscription {
  sub() {

  }

  unsub() {

  }
}

export default LuftDataSubscription;
