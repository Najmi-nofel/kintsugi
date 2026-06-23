const Title = (props) => {
  const { children } = props;
  return (
    <h4 className="font-semibold text-xl flex justify-center mb-1 md:mb-3">
      {children}
    </h4>
  );
};

const Body = (props) => {
  const { children, desc } = props;
  return (
    <>
      <p className="text-cream text-lg font-normal md:font-light md:text-xs lg:text-lg lg:font-normal">
        {children} <span className="inline md:hidden lg:inline">{desc}</span>
      </p>
    </>
  );
};

const Tag = (props) => {
  const { children } = props;
  return (
    <p className="uppercase text-main font-normal text-sm md:text-md md:font-medium">
      {children}
    </p>
  );
};

const Card = (props) => {
  const { children, id, className } = props;
  return (
    <div
      id={id}
      className={`container py-3 px-5 bg-black h-52 rounded-2xl border border-secondary md:h-auto md:rounded-none md:border-none ${className}`}
    >
      {children}
    </div>
  );
};

export { Card, Tag, Title, Body };
