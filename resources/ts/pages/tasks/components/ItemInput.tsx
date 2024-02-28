import { FC } from "react";

type Props = {
    editTitle: string | undefined;
    handleOnKey: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdate: (
        e:
            | React.MouseEvent<HTMLButtonElement>
            | React.FormEvent<HTMLFormElement>
    ) => void;
};

const ItemInput: FC<Props> = ({
    editTitle,
    handleOnKey,
    handleInputChange,
    handleUpdate,
}) => {
    return (
        <>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    className="input"
                    defaultValue={editTitle}
                    onChange={handleInputChange}
                    onKeyDown={handleOnKey}
                />
            </form>

            <button className="btn" onClick={handleUpdate}>
                更新
            </button>
        </>
    );
};

export default ItemInput;
