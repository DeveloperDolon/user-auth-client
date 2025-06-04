import { Button } from "antd";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import { useSubdomain } from "../../hooks/useSubdomain";
import { Link } from "react-router-dom";

const Home = () => {
  const { isSubdomain, shopName } = useSubdomain();

  return (
    <ResponsiveContainer>
      <h1 className="md:text-4xl sm:text-3xl text-2xl font-semibold text-center mt-10">
        {isSubdomain ? (
          <>
            This is <span className="underline text-red-500">{shopName}</span>{" "}
            shop
          </>
        ) : (
          <>
            <span>Welcome to the main domain</span>
            <br />
            <Link to={"/signin"}>
              <Button color="blue" variant="filled" size="large">
                Sign in
              </Button>
            </Link>
          </>
        )}
      </h1>
    </ResponsiveContainer>
  );
};

export default Home;
