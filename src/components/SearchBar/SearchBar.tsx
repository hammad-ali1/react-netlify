export type SearchBarProps = {
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
};
function SearchBar({ onChangeHandler }: SearchBarProps) {
  return (
    <div>
      <input type="text" onChange={onChangeHandler} />
    </div>
  );
}

export default SearchBar;
