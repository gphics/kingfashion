type propsType = {
  arr: { name: string; type: string; value: string | number }[];
  description: string;
  basicUpdateHandler: (e: any) => void;
};
function Basic({ arr, description, basicUpdateHandler }: propsType) {
  return (
    <section className="basic">
      {arr.map(({ name, value, type }, index) => {
        return (
          <div className="each" key={index}>
            <label htmlFor={name}> {name} </label>
            <input
              onChange={basicUpdateHandler}
              title={name}
              value={value}
              name={name}
              type={type}
            />
          </div>
        );
      })}
      <div className="each desc">
        <label htmlFor="description"> description </label>
        <textarea
          onChange={basicUpdateHandler}
          title="description"
          value={description}
          name="description"
        />
      </div>
    </section>
  );
}

export default Basic;
