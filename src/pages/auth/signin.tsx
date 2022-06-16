import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import Image from "next/image";
import nextAuthLogo from "../../public/logo-sm.png";

const Signin = ({ csrfToken, providers }: any) => {
  if (!providers) return null;
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <div className="text-center">
          <Image
            src={nextAuthLogo}
            alt="NextAuth Logo"
            width={150}
            height={166}
          />
        </div>
        <div>
          {Object.values(providers).map((provider: any) => (
            <div
              key={provider.id}
              className="bg-blue-500 hover:bg-blue-700 text-white text-xl py-3 px-4 rounded w-auto inline-block"
            >
              <button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Signin;

export async function getServerSideProps(context: any) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      providers,
      csrfToken,
    },
  };
}
