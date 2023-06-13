import { useState } from "react";

const Section = ({ title, description, isVisible, setIsVisible }) => {
  // const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="border border-black p-2 m-2">
      <h3 className="font-bold text-xl">{title}</h3>
      {isVisible ? (
        <button
          onClick={() => setIsVisible(false)}
          className="curser-pointer underline"
        >
          hide
        </button>
      ) : (
        <button
          onClick={() => setIsVisible(true)}
          className="curser-pointer underline"
        >
          show
        </button>
      )}

      {isVisible && <p>{description}</p>}
    </div>
  );
};

const Instamart = () => {
  const [sectionConfig, setSectionConfig] = useState({
    showAbout: false,
    showteam: false,
    showCareers: false,
  });
  return (
    <div>
      <h1 className="text-3xl p-2 m-2 font-bold">Instamart</h1>
      <Section
        title="team"
        description="sdvcajfdh"
        isVisible={sectionConfig.showteam}
        setIsVisible={() =>
          setSectionConfig({
            showAbout: false,
            showteam: true,
            showCareers: false,
          })
        }
      />
      <Section
        title="about"
        description="sdvcabfbxjfdh"
        isVisible={sectionConfig.showteam}
        setIsVisible={() =>
          setSectionConfig({
            showAbout: true,
            showteam: false,
            showCareers: false,
          })
        }
      />
      <Section
        title="career"
        description="fdjxbjklfdklbjfg"
        setIsVisible={() =>
          setSectionConfig({
            showAbout: false,
            showteam: false,
            showCareers: true,
          })
        }
      />
    </div>
  );
};

export default Instamart;
