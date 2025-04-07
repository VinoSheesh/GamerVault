import SideMenu from '../components/SideMenu';

function Utama() {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 p-8 border-1 border-black shadow-sm flex content-between items-center gap-8 overflow-hidden transition duration-500 bg-black">
      <SideMenu></SideMenu>
      <div className="relative w-[80%] h-full rounded-2xl border border-[rgba(0,0,0,0.1)] bg-zinc-800 shadow-[ -5px_-5px_15px_rgba(255,255,255,0.1),5px_5px_15px_rgba(0,0,0,0.35)] transition duration-1000"></div>
    </div>
  );
}

export default Utama;
