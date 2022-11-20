export default function Hero(props) {
  return (
    <section
      style={{
        boxShadow:
          'inset 0 8px 8px -8px rgb(0 0 0 / 30%), inset 0 -8px 8px -8px rgb(0 0 0 / 30%',
      }}
      className="bg-[#5db85c] py-9"
    >
      <div className="text-center">
        <h1 className="font-bold text-[#FFFEFE] text-5xl">conduit</h1>
        <p className="text-[#F2F9EC] font-thin text-xl mt-2">
          A place to share your knowledge.
        </p>
      </div>
    </section>
  );
}
