'use client';

import { useState, FormEvent, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import axios from '@/app/config/axios';
import Topbar from '@/app/components/Topbar';
import { Button } from '@/app/utils/Button';
import { FormCard } from '@/app/utils/FormCard';
import { useSession } from 'next-auth/react';
import { Input } from '@/app/utils/Input';
import { TextArea } from '@/app/utils/TextArea';
import { SelectInput } from '@/app/utils/Select';


export default function SubmitProject() {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [videoLink, setVideoLink] = useState<string>('');
  const [targetedProblem, setTargetedProblem] = useState<string>('');
  const [pending, setPending] = useState(false);
  const [calls, setCalls] = useState<any[]>([]);
  const [thematics, setThematics] = useState<any[]>([]);
  const [selectedCall, setSelectedCall] = useState<number>();
  const [selectedThematic, setSelectedThematic] = useState<number>();
  const [challenges, setChallenges] = useState<any[]>([]);
  const [selectedChallenges, setSelectedChallenges] = useState<number[]>([]);
  const router = useRouter();
  const { status, data } = useSession();
  const isLogged = status === 'authenticated';
  const account = data?.user;

  useEffect(() => {
    axios.get(`calls`).then(({ data: apiResponse }) => {
      const options = apiResponse.data;
      setCalls(
        options.map((option: any) => ({
          value: option.id,
          label: option.name,
        })),
      );
    }).catch(() => {
    });
  }, [router]);

  const handleCallChange = (option: any) => {
    setSelectedCall(option.value);
    axios.get(`calls/${option.value}`).then(({ data: apiResponse }) => {
      const { thematics: options } = apiResponse.data;
      setThematics(
        options.map((option: any) => ({
          value: option.id,
          label: option.name,
        })),
      );
    }).catch(() => {
    });
  };

  const handleThematicsChange = (option: any) => {
    setSelectedThematic(option.value);
    axios.get(`thematics/${option.value}`).then(({ data: apiResponse }) => {
      console.log(apiResponse.data);
      const { challenges: options } = apiResponse.data;
      setChallenges(
        options.map((option: any) => ({
          value: option.id,
          label: option.name,
        })),
      );
    }).catch(() => {
    });
  };

  function handleChallenge(options: any) {
    setSelectedChallenges(
      options.map((option: any) => option.value),
    );
  }

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      setPending(true);
      const payload = {
        name,
        videoLink,
        description,
        targetedProblem,
        call: selectedCall,
        thematic: selectedThematic,
        user: account?.email,
        challenges: selectedChallenges,
      };
      await axios.post('/sotutions', JSON.stringify(payload));
      toast.success('Solution soumis avec succès !');
      setPending(false);
      setTimeout(() => {
        router.push('/me');
      }, 2000);
    } catch {
      toast.error('Échec survenue lors de la soumission de la solution');
      setPending(false);
    } finally {
      setPending(false);
    }
  };


  return (
    <>
      <Topbar background={'bg-white'} />
      <FormCard title={'Soumettez votre solution'}>
        <form className="space-y-8 flex flex-col justify-center">

          {
            isLogged && (
              <>
                <SelectInput name={'calls'} label={'Choisir un appel à solution'}
                             options={calls} onChange={handleCallChange} />

                <SelectInput name={'thematics'} label={'Choisir une thématique'}
                             options={thematics} onChange={handleThematicsChange} />

                <SelectInput name={'challenges'} label={'A quoi votre solution répond elle ?'}
                             options={challenges}
                             onChange={handleChallenge} />
              </>
            )
          }

          <Input name={'name'} label={'Le titre de la solution'} placeholder={'Ecrire ici...'} type={'text'}
                 value={name} onChange={(e) => setName(e.target.value)} />

          <TextArea name={'description'} label={'La description de la solution'}
                    placeholder={'Decrire la solution ici...'} value={description}
                    onChange={(e) => setDescription(e.target.value)} />

          <TextArea name={'targetedProblem'} label={'Le problème que la solution résoud'}
                    placeholder={'Decrire le problème ici...'} value={targetedProblem}
                    onChange={(e) => setTargetedProblem(e.target.value)} />

          <Input name={'videoLink'} label={'Le lien de la vidéo(optionnel)'} placeholder={'Coller le lien de la vidéo'}
                 type={'text'} value={videoLink} onChange={(e) => setVideoLink(e.target.value)} />

          <Button isLoading={pending} label={pending ? 'Soumission en cours...' : 'Soumettre'} onclick={onSubmit} />
        </form>
      </FormCard>
      <ToastContainer />
    </>
  );
}
