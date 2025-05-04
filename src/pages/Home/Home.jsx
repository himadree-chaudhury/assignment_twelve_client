import Banner from '../../components/Home/Banner';
import Heading from '../../components/Shared/Utilities/Heading';

const Home = () => {
    return (
      <div>
        {/* Header section */}
        <header>
          <Banner />
        </header>

        {/* Section : premium members */}
        <Heading
          title={"MEMBERS"}
          heading={"Meet Our Premium Members"}
          description={
            "Discover our latest premium members looking for their perfect match. Sort by age and connect with someone special today"
          }
        />
        {/* Section : work flow */}
        <Heading
          title={"HOW IT WORKS"}
          heading={"Your Journey to Love in 3 Simple Steps"}
          description={
            "Pathway makes finding your life partner easy. Create your biodata, explore matches, and connect with your perfect partner - all in just a few clicks"
          }
        />
        {/* Section : success counter */}
        <Heading
          title={"SUCCESS COUNTER"}
          heading={"Our Love Milestones"}
          description={
            "Celebrate with us! See how many couples have found love through Pathway, with new stories added every day"
          }
        />
        {/* Section : success stories */}
        <Heading
          title={"STORIES"}
          heading={"Real Love Stories from Pathway"}
          description={
            "Be inspired by couples who found their forever through Pathway. Explore their journeys, sorted by marriage date, and start writing your own story"
          }
        />
      </div>
    );
};

export default Home;