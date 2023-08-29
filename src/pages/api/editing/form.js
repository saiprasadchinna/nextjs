// import axios from 'axios';
// export default function handler(req, res) {
//     // Get data submitted in request's body.
//     debugger;
//     const body = req.body
   
//     // Optional logging to see the responses
//     // in the command line where next.js app is running.
//     console.log('body: ', body)
   
//     // Guard clause checks for first and last name,
//     // and returns early if they are not found
//     if (!body.userName || !body.email) {
//       // Sends a HTTP bad request error code
//       return res.status(400).json({ data: 'First or last name not found' })
//     }
   
//     // Found the name.
//     // Sends a HTTP success code
//     // res.status(200).json({ data: `${body.firstName} ${body.lastName}` })
//     res.status(200).json({ user: `${body.userName} ${body.email}` });
//   }

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// eslint-disable-next-line
import axios from 'axios';
export default function handler(req, res) {
  const body = req.body;
  const mailchimpUrl = 'https://localhost:44315/Home?Name=' +
  body.userName +
  '&Email=' +
  body.email +
  '&PhoneNumber=' +
  body.phoneNumber +
  '';
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    axios
      .post(mailchimpUrl, req.body, config)
      .then(function (response) {
        console.log(response);
        res.status(200).json({ mailchimpSuccess: response.data });
      })
      .catch(function (error) {
        console.log(error);
        res.status(500).json({ mailchimpError: error });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mailchimpError: error });
  }
}
