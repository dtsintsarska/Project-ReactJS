import React, { useState, Fragment, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './enrollPage.module.css';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Input from '../../components/input';
import Title from '../../components/title';
import SubmitButton from '../../components/submit-button';
import getCookie from '../../helpers/cookie';
import UserContext from '../../Context';

const EnrollPage = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const context = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = context.user.id;
    const adventureId = props.match.params.id;

    await fetch(`http://localhost:9999/api/offers/enroll/${adventureId}`, {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        phone,
        email,
        id,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('x-auth-token'),
      },
    });

    setEmail('');
    setFirstName('');
    setLastName('');
    setPhone('');
    history.push(`/adventures/${adventureId}`);
  };

  return (
    <Fragment>
      <Header />
      <section className={styles.background}>
        <Title title='Become a part of our next adventure' />
        <h4>Fulfill all fields to save your seat</h4>
      </section>
      <form className={styles.container} onSubmit={handleSubmit}>
        <Input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          label='First Name'
          id='firstName'
          placeholder='Type your first name'
          type='text'
        />
        <Input
          type='text'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          label='Last Name'
          id='lastName'
          placeholder='Type your last name'
        />
        <Input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label='Email'
          id='email'
          placeholder='Type your email address'
        />
        <Input
          type='text'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          label='Phone'
          id='phone'
          placeholder='Type your phone'
        />

        <SubmitButton title='Submit' onClick={handleSubmit} />
      </form>

      <Footer />
    </Fragment>
  );
};

export default EnrollPage;
