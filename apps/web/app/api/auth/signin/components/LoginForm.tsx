'use client';

import { FormEvent, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { _post } from '@/requests/_post';
import { signIn } from 'next-auth/react';
import Topbar from '@/app/components/Topbar';
import { FormCard } from '@/app/utils/FormCard';
import { Input } from '@/app/utils/Input';
import { Button } from '@/app/utils/Button';
import Image from 'next/image';
import googleLogo from '@/public/googleLogo.svg';

export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [pending, setPending] = useState<boolean>(false);
  const [containsError, setContainsError] = useState<boolean>(false);
  const [emailState, setEmailState] = useState<number>(0);
  const [passwordState, setPasswordState] = useState<number>(0);
  const [errors, setErrors] = useState<string>('');
  const desableButton = emailState === 1 || passwordState === 1

  async function loginWithCredentials(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    if (!password && !email) {
      setPending(false);
      setContainsError(true);
      return setErrors('Veuillez remplir les champs');
    }
    const payload = {
      email,
      password,
    };
    const { response, error } = await _post('auth/login', payload);
    const data = response?.data;

    if (data) {
      setEmailState(2);
      await signIn('credentials', {
        email: email,
        password: password,
        callbackUrl: '/me',
      });
      setPending(false);
      toast.success(`Bienvenue ${data.name} !`);
    }

    if (error) {
      setContainsError(true);
      setPending(false);
      setErrors(error);
    }
  }

  async function loginWithGoogle(e: FormEvent) {
    e.preventDefault();
    await signIn('google', {
      callbackUrl: '/me',
    });
  }

  function handleEmailChange(e: any) {
    const email: string = e.target.value;
    const emailRegex = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
    setEmail(email);
    if (emailRegex.test(email)) {
      setEmailState(2);
    } else {
      setEmailState(1);
    }
  }

  function handlePasswordChange(e: any) {
    const password: string = e.target.value;
    setPassword(password);
    if (password.length > 4) {
      setPasswordState(2);
    } else {
      setPasswordState(1);
    }
  }

  return (
    <>
      <Topbar background={'bg-white'} />
      <FormCard title={'Se connecter'} errors={errors} containsErrors={containsError} onClearErrors={() => setContainsError(false)}>
        <Input name={'email'} label={'Email'} placeholder={'Entrez votre email'} type={'email'} value={email}
               onChange={handleEmailChange} state={emailState}
        />
        <Input name={'password'} label={'Mot de passe'} placeholder={'Entrez votre mot de passe'}
               type={'password'} state={passwordState} value={password} onChange={handlePasswordChange} />
        <Button isLoading={pending || desableButton} label={pending ? 'Connexion en cours...' : 'Se connecter'}
                onclick={loginWithCredentials} />
        <button
          className={'rounded-full text-sm md:text-base px-3 py-2 border gap-8 hover:bg-gray-100 transition-colors duration-200 relative'}
          onClick={loginWithGoogle}>
          Se connecter avec google
          <Image src={googleLogo} alt={'google logo'} className={'w-6 h-auto absolute top-2 right-2'} />
        </button>
      </FormCard>
      <ToastContainer />
    </>
  );
}