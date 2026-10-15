import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="h-dvh relative bg-linear-to-b from-zinc-100 to-zinc-400 gap-4 w-screen flex items-center justify-center flex-col">
      <h1 className="text-[160px] sm:text-[160px] md:text-[200px] top-47  sm:top-40 md:top-38 absolute font-black">
        <span className="">4</span>
        <span>0</span>
        <span>4</span>
      </h1>{" "}
      <section className="p-20 flex flex-col items-center gap-6 bg-black/5 rounded-lg border-b border-l border-zinc-300  backdrop-blur-xs ">
        <p className="text-2xl font-bold"> Page not Found :(</p>
        <Link
          className="p-3 border-zinc-400 bg-black/5 rounded-lg border "
          to={"/Products"}
        >
          Go back to products page
        </Link>
      </section>
    </div>
  );
};

export default NotFoundPage;
