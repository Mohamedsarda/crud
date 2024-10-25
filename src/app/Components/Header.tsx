const Header = ({ openEdit }: { openEdit: (id: number) => void }) => {
  return (
    <div className="Header">
      <img
        src="https://cdn.logojoy.com/wp-content/uploads/20220329171710/telegram-app-logo.png"
        alt="Logo"
        className="w-[80px] h-[80px] rounded"
      />
      <div className="btns">
        <button onClick={() => openEdit(-1)}>Add A New User</button>
      </div>
    </div>
  );
};

export default Header;
