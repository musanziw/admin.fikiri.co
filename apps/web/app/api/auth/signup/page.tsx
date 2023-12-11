'use client';

import { useState, FormEvent } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '@/app/config/axios';
import { FormCard } from '@/app/utils/FormCard';
import { Button } from '@/app/utils/Button';
import Topbar from '@/app/components/Topbar';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import googleLogo from '@/public/googleLogo.svg';
import { signIn } from 'next-auth/react';
import { Input } from '@/app/utils/Input';


export default function Register() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      const payload = {
        name,
        email,
        phoneNumber,
        address,
        password,
      };
      await axios.post('auth/register', JSON.stringify(payload));
      toast.success('Inscription reussie');
      setIsLoading(false);
      setTimeout(() => {
        router.push('/api/auth/signin');
      }, 2000);
    } catch (e: any) {
      toast.error(e.response.data.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  async function loginWithGoogle(e: FormEvent) {
    e.preventDefault();
    await signIn('google', {
      redirect: false,
      callbackUrl: '/me',
    });
  }

  return (
    <>
      <Topbar background={'bg-white'} />
      <FormCard title={'Inscrivez-vous'}>
        <Input name={'name'} label={'Entrez votre nom'} placeholder={'Saisir le nom'} type={'text'} value={name}
               onChange={(e) => setName(e.target.value)} />

        <Input name={'email'} label={'Entrez votre email'} placeholder={'Saisir l\'email'} type={'email'}
               value={email} onChange={(e) => setEmail(e.target.value)} />

        <Input name={'phoneNumber'} label={'Entrez votre numéro de téléphone'}
               placeholder={'Saisir le numéro de téléphone'} type={'text'} value={phoneNumber}
               onChange={(e) => setPhoneNumber(e.target.value)} />

        <Input name={'address'} label={'Entrez votre adresse'} placeholder={'Saisir l\'adresse'} type={'text'}
               value={address} onChange={(e) => setAddress(e.target.value)} />

        <Input name={'password'} label={'Entrez votre mot de passe'} placeholder={'Saisir le mot de passe'}
               type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} />

        <Input name={'confirmedPassword'} label={'Confirmez votre mot de passe'}
               placeholder={'Confirmer le mot de passe'} type={'password'} value={confirmedPassword}
               onChange={(e) => setConfirmedPassword(e.target.value)} />

        <Button isLoading={isLoading} label={isLoading ? 'Inscription en cours ...' : 'S\'inscire'} onclick={onSubmit}
        />

        <button
          className={'rounded-full px-3 py-2 border gap-8 hover:bg-gray-100 transition-colors duration-200 relative'}
          onClick={loginWithGoogle}>
          S&apos;inscrire avec google
          <Image src={googleLogo} alt={'google logo'} className={'w-6 h-auto absolute top-2 right-2'} />
        </button>
      </FormCard>
      <ToastContainer />
    </>
  );
}
