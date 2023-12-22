import Card from "./Card";

const data = [
  {
    title: "Developers",
    desc: "A community of skilled programmers and software engineers who excel in crafting innovative solutions. They are proficient in various programming languages.",
  },
  {
    title: "Corporate Professionals",
    desc: "An elite group of business experts and leaders who navigate the corporate landscape with strategic vision and operational excellence. ",
  },
  {
    title: "Bankers",
    desc: "A cohort of finance professionals deeply involved in the banking sector. They manage financial transactions, assess risks.",
  },
  {
    title: "Designers",
    desc: "Creative minds with a passion for aesthetics and functionality. Designers bring ideas to life through visual elements, ",
  },
];

const WhoJoinUs = () => {
  return (
    <div>
      <div className="container py-16">
        <h2 className="text-4xl text-center mb-8 font-bold">
          what type of people
          <br /> use this app?
        </h2>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          {data.map((item, i) => (
            <Card key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhoJoinUs;
