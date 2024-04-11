import Head from 'next/head';
import React from 'react';
import InterestForm from './components/InterestForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Desafio processo seletivo BASF" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <InterestForm />
      </main>
    </>
  );
}

