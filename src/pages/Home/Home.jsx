import Banner from "../../components/Home/Banner";
import Heading from "../../components/Shared/Utilities/Heading";
import SuccessCounter from "../../components/Home/SuccessCounter";
import PremiumMembers from "../../components/Home/PremiumMembers";
import SuccessStory from "../../components/Home/SuccessStory";
import Workflow from "../../components/Home/Workflow";

const Home = () => {
  return (
    <div>
      {/* Header section */}
      <header>
        <Banner />
      </header>

      <div className="section-layout">
        {/* Section : premium members */}
        <Heading
          title={"MEMBERS"}
          heading={"Meet Our Premium Members"}
          description={
            "Discover our latest premium members looking for their perfect match. Sort by age and connect with someone special today"
          }
        />
        {/* members card */}
        <PremiumMembers />

        {/* Section : work flow */}
        <Heading
          title={"HOW IT WORKS"}
          heading={"Your Journey to Love in 3 Simple Steps"}
          description={
            "Pathway makes finding your life partner easy. Create your biodata, explore matches, and connect with your perfect partner - all in just a few clicks"
          }
        />
        {/* steps */}
        <Workflow />

        {/* Section : success counter */}
        <Heading
          title={"SUCCESS COUNTER"}
          heading={"Our Love Milestones"}
          description={
            "Celebrate with us! See how many couples have found love through Pathway, with new stories added every day"
          }
        />
        {/* counters */}
        <SuccessCounter />

        {/* Section : success stories */}
        <Heading
          title={"STORIES"}
          heading={"Real Love Stories from Pathway"}
          description={
            "Be inspired by couples who found their forever through Pathway. Explore their journeys, sorted by marriage date, and start writing your own story"
          }
        />
        {/* stories */}
        <SuccessStory />
      </div>
    </div>
  );
};

export default Home;
