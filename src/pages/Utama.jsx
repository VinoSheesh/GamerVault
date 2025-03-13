import SideMenu from '../components/sideMenu';

function Utama() {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 p-8 border-1 border-black shadow-sm flex content-between items-center gap-8 overflow-hidden transition duration-500">
        <SideMenu></SideMenu>
    </div>
  );
}

export default Utama;
