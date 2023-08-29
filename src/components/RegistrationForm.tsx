import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useI18n } from 'next-localization';

const postDataAxios = async (candidat: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  //#region Internal api calls
  // const response = await axios.post('api/editing/form', JSON.stringify(candidat), config);
  // console.log(response.data);
  // alert('Thanks for Registering.');
  //#endregion
  const contact = {
    email_address: candidat.email,
    status: 'subscribed',
    merge_fields: { FNAME: candidat.email.split('@')[0], LNAME: candidat.email.split('@')[1] },
    tags: ['dargroup'],
  }; // Add the contact to the list

  try {
    const response = await axios.post('api/subscribe', contact, config);
    console.log(response.data);
    alert('Thanks for subscribing.');
  } catch (error) {
    console.error(error);
  }
};

export default function RegistrationForm() {
  const { t } = useI18n();
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required(t('firstNameKey')),
    last_name: Yup.string().required(t('lastNameKey')),
    email: Yup.string().required(t('emailKey')).email('Email is invalid'),
    password: Yup.string().required('password is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
  });
  //console.log('Data:', Datas);

  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const [candidat, setCandidat] = useState({
    first_name: '',
    email: '',
    phoneNumber: '',
  });

  // Example POST method implementation:
  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  // postData('https://example.com/answer', { answer: 42 }).then((data) => {
  //   console.log(data); // JSON data parsed by `data.json()` call
  // });

  async function postCall() {
    try {
      //#region Internal api calls
      // const response = await axios.post('api/editing/form', JSON.stringify(candidat), config);
      // console.log(response.data);
      // setUser(response.data.user);
      // alert('Thanks for Registering.');
      //#endregion

      const Url =
        'https://localhost:44315/Home?Name=' +
        candidat.first_name +
        '&Email=' +
        candidat.email +
        '&PhoneNumber=' +
        candidat.phoneNumber +
        '';
      // const dataaa = postData(Url, candidat);
      // console.log(dataaa);
      // const response2 = await axios.get('https://jsonplaceholder.typicode.com/users');
      // console.log('ResponseData' + JSON.stringify(response2.data));
      await fetch(Url, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        mode: 'no-cors',
        body: JSON.stringify(candidat),
      })
        // .then((response) => {
        //   if (!response.ok) {
        //     throw new Error(`An error occurredd: ${response.status}`);
        //   }
        //   return response.json();
        // })
        .then((data) => console.log(data))
        .then((text) => {
          try {
            const data = JSON.parse(text);
            console.log(data);
          } catch (error) {
            console.error('Invalid JSON:', text);
          }
        })
        .catch((error) => console.error(error));
      //console.log(response.json());
    } catch (error) {
      console.error(error);
    }
  }
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //postCall();
    //   //postDataAxios(candidat);
    callToNormalHttpRequest();
  };
  // function onSubmit(e) {
  //   //postCall();
  //   //postDataAxios(candidat);
  //   callToNormalHttpRequest();
  // }
  return (
    <div className="my-8 mx-8">
      <form onSubmit={handleSubmit(onSubmit)} id="reset">
        <div className="py-1">
          <label className="text-gray-600 font-medium" htmlFor="first_name">
            First Name :
          </label>
          <input
            {...register('first_name')}
            name="first_name"
            type="text"
            className="text-md px-2 text-gray-500 border w-[40rem] focus:outline-none focus:border-orange-500 rounded py-1"
            id="first_name"
            onChange={() => {
              setCandidat({ ...candidat, first_name: event.target.value });
            }}
          />
          <div className="text-red-500 ml-2 mt-2 error">{errors.first_name?.message}</div>
        </div>
        <div className="py-1">
          <label className="text-gray-600 font-medium" htmlFor="last_name">
            Last Name :
          </label>
          <input
            {...register('last_name')}
            name="last_name"
            type="text"
            id="last_name"
            className="text-md px-2 text-gray-500 border w-[40rem] focus:outline-none focus:border-orange-500 rounded py-1"
          />
          <div className="text-red-500 ml-2 mt-2 error">{errors.last_name?.message}</div>
        </div>
        <div className="py-1">
          <label className="text-gray-600 font-medium" htmlFor="email">
            Email :
          </label>
          <input
            {...register('email')}
            name="email"
            type="text"
            id="email"
            onChange={() => {
              setCandidat({ ...candidat, email: event.target.value });
            }}
            className="text-md  px-2 text-gray-500 border w-[40rem] focus:outline-none focus:border-orange-500 rounded py-1"
          />
          <div className="text-red-500 ml-2 mt-2 error">{errors.email?.message}</div>
        </div>
        <div className="py-1">
          <label className="text-gray-600 font-medium" htmlFor="password">
            Password :
          </label>
          <input
            {...register('password')}
            name="password"
            type="password"
            id="password"
            className="text-md px-2 text-gray-500 border w-[40rem] focus:outline-none focus:border-orange-500 rounded py-1"
          />
          <div className="text-red-500 ml-2 mt-2 error">{errors.password?.message}</div>
        </div>
        <div className="py-1">
          <label className="text-gray-600 font-medium" htmlFor="phoneNumber">
            PhoneNumber :
          </label>
          <input
            {...register('phoneNumber')}
            name="phoneNumber"
            type="phoneNumber"
            id="phoneNumber"
            onChange={() => {
              setCandidat({ ...candidat, phoneNumber: event.target.value });
            }}
            className="text-md px-2 text-gray-500 border w-[40rem] focus:outline-none focus:border-orange-500 rounded py-1"
          />
          <div className="text-red-500 ml-2 mt-2 error">{errors.phoneNumber?.message}</div>
        </div>
        <button type="submit" className="color:red">
          submit
        </button>
      </form>
      <style jsx>
        {`
          .error {
            color: red;
          }
        `}
      </style>
    </div>
  );
  async function callToNormalHttpRequest() {
    //const [Datas, setDatas] = useState([]);

    const contact = {
      email_address: candidat.email,
      status: 'subscribed',
      tags: ['dargroup dev'],
    };
    const authorization = 'Basic ' + 'e8fbc1b4ba89033bd22e10ede667469e-us12';
    // const authorization =
    //   'Basic ' +
    //   Buffer.from('randomstring:' + 'e8fbc1b4ba89033bd22e10ede667469e-us12').toString('base64');
    console.log(authorization);
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
      withCredentials: true,
      mode: 'no-cors',
      body: JSON.stringify(contact),
    };

    axios
      .get('https://us12.api.mailchimp.com/3.0/lists', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorization,
        },
      })
      .then(function (response) {
        //setDatas(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    try {
      // const response = await axios.post('/api/subscribe', contact, config);
      // console.log(response.data);
      await fetch('https://us12.api.mailchimp.com/3.0/lists/17e94f4367/members/', config)
        .then((data) => console.log(data))
        .then((text) => {
          try {
            //const data = JSON.parse(text);
            console.log('success');
            console.log(text);
          } catch (error) {
            console.error('Invalid JSONN:', text);
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  }
}
