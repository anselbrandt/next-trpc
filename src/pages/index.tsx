import { Note } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import superjson from "superjson";
import { SuperJSONResult } from "superjson/dist/types";
import Header from "../components/Header";
import NoteForm from "../components/NoteForm";
import UserForm from "../components/UserForm";
import { prisma } from "../db/client";
import { trpc } from "../utils/trpc";

const TrpcNotes: NextPage = () => {
  const { data: notes } = trpc.useQuery(["notes.getAll"]);
  if (!notes) return null;
  return (
    <div>
      {notes.map((note) => (
        <div key={note.id}>{note.content}</div>
      ))}
    </div>
  );
};

interface NotesProps {
  data: SuperJSONResult;
}

const Notes: NextPage<NotesProps> = ({ data }) => {
  if (!data) return null;
  const notes = superjson.deserialize(data) as Note[];
  return (
    <div>
      {notes.map((note) => (
        <div key={note.id}>{note.content}</div>
      ))}
    </div>
  );
};

interface Props {
  data: any;
}

const Home: NextPage<Props> = ({ data }) => {
  return (
    <div>
      <Head>
        <title>Next.js tRPC</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="text-xl underline">From getServerSideProps</div>
      <Notes data={data} />
      <div className="text-xl underline">From tRPC</div>
      <TrpcNotes />
      <NoteForm />
      <UserForm />
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const data = await prisma.note.findMany();

  return {
    props: {
      data: superjson.serialize(data),
    },
  };
};
