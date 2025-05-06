import PageHeading from "../../components/Shared/Utilities/PageHeading";
import useAuth from "../../hooks/useAuth";

const Statistics = () => {
  const {user} = useAuth();
  return (
    <div className="aside-layout">
      <title>Dashboard | Pathway</title>
      <PageHeading
        heading={`Welcome To Dashboard, ${user?.displayName}`}
        text={"Manage your journey to love with ease"}
      />
    </div>
  );
};
export default Statistics;
