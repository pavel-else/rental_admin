import axios from 'axios';

export default async (data) => {
  if (!data) {
    return false;
  }

  const url = 'https://rentix.biz/libs/user_uploads.php';
  const config = {
    header: {
      'Content-Type' : 'multipart/form-data',
    }
  }
  let result;

  await axios.post(url, data, config).then(
    r => { 
      console.log(r);
      result = r;
    }
  )
  return result;
};