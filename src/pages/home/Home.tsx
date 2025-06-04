import ResponsiveContainer from "../../components/ResponsiveContainer";
import { useSubdomain } from "../../hooks/useSubdomain";

const Home = () => {
  const { isSubdomain, shopName } = useSubdomain();
  return (
    <ResponsiveContainer>
      <h1 className="md:text-4xl sm:text-3xl text-2xl font-semibold text-center mt-10">
        {isSubdomain ? (
          <>
            This is <span className="underline text-red-500">{shopName}</span> shop
          </>
        ) : (
          "Welcome to the main domain"
        )}
      </h1>
    </ResponsiveContainer>
  );
};

export default Home;
