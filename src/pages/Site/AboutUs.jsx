import PageHeading from "../../components/Shared/Utilities/PageHeading";

const AboutUs = () => {
  return (
    <div className="section-layout">
      <title>About Us | Pathway</title>
      <PageHeading
        heading={"About Us"}
        text={"Discover the heart and soul behind Pathway"}
      />
      <main className="px-4 sm:px-6 lg:px-8">
        {/* Mission Section */}
        <section className="card mb-12 transform transition duration-300 hover:scale-105">
          <h2 className="border-primary mb-4 border-b-2 pb-2 text-2xl font-bold">
            Our Mission
          </h2>
          <p>
            At Pathway, our mission is to transform the way people find their
            life partners by creating a platform that celebrates love,
            compatibility, and shared dreams. We connect individuals across
            cultures and communities, using advanced matching algorithms and
            personalized support to ensure every journey is unique and
            fulfilling. Our commitment is to foster authentic relationships that
            blossom into lifelong partnerships, guided by trust, respect, and
            understanding.
          </p>
        </section>

        {/* Vision Section */}
        <section className="card mb-12 transform transition duration-300 hover:scale-105">
          <h2 className="border-success mb-4 border-b-2 pb-2 text-2xl font-bold">
            Our Vision
          </h2>
          <p>
            We envision a global community where finding true love is accessible
            to all, empowered by innovative technology and heartfelt service.
            Pathway strives to be the leading matrimony platform, weaving a
            tapestry of successful unions across the world. By prioritizing user
            experience and cultural sensitivity, we aim to inspire thousands of
            love stories, making every connection a step toward a brighter
            future.
          </p>
        </section>

        {/* Team Section */}
        <section className="card transform transition duration-300 hover:scale-105">
          <h2 className="mb-6 border-b-2 border-fuchsia-500 pb-2 text-2xl font-bold">
            Meet Our Team
          </h2>
          <p className="mb-6">
            Pathway is driven by a diverse and passionate team of experts who
            bring their unique skills to create a platform that resonates with
            users worldwide. With backgrounds in technology, psychology,
            customer support, and cultural studies, our team is dedicated to
            ensuring your experience is seamless, supportive, and tailored to
            your needs.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card bg-amber-100 transition duration-300 hover:shadow-xl">
              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Himadree Chaudhury"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-black">
                Himadree Chaudhury
              </h3>
              <p className="text-gray-600">Co-Founder & CEO</p>
              <p className="mt-2 text-gray-600">
                A visionary leader, Himadree founded Pathway to revolutionize
                matrimony with empathy and innovation.
              </p>
            </div>
            <div className="card bg-rose-100 transition duration-300 hover:shadow-xl">
              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Himadree Chaudhury"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-black">
                Himadree Chaudhury
              </h3>
              <p className="text-gray-600">CTO</p>
              <p className="mt-2 text-gray-600">
                Himadree drives our tech vision, ensuring a secure and
                cutting-edge platform for all.
              </p>
            </div>
            <div className="card bg-indigo-100 transition duration-300 hover:shadow-xl">
              <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Himadree Chaudhury"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-black">
                Himadree Chaudhury
              </h3>
              <p className="text-gray-600">Head of Support</p>
              <p className="mt-2 text-gray-600">
                Himadree leads a compassionate team, offering personalized
                assistance to every user.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
