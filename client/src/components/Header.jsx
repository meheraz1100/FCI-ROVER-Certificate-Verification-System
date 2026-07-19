export default function Header() {
  return (
    <header className="bg-[#173f27] text-center py-10 border-b-2 border-yellow-500">

      <div className="mb-3 flex justify-center">
        <img
          src="https://i.ibb.co.com/Wv5CqjYV/75473952-3155300311153117-6053126323419742208-n-removebg-preview.png"
          alt="Rover Scout Logo"
          className="h-16 w-auto object-contain drop-shadow-lg"
        />
      </div>

      <h1 className="text-4xl font-bold uppercase">
        Feni Government Computer Institute
      </h1>

      <h1 className="text-yellow-400 mt-2 tracking-[4px] uppercase">
        Rover Scout Group
      </h1>

      <p className="text-xl font-bold text-gray-300 mt-3">
        Certificate Verification System
      </p>

    </header>
  );
}