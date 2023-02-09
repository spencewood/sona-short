import { useReducer, useState } from "react";
import { ILink } from "../data/link.interface";
import { isValidUri } from "../util/url";

enum StateType {
  Loaded,
  Loading,
  Error,
}

interface IState {
  state: StateType;
  errorMessage: string;
}

interface IAction {
  type: StateType;
  message?: string;
}

const initialState = {
  state: StateType.Loaded,
  errorMessage: "",
};

const dataReducer = (_state: IState, action: IAction): IState => {
  switch (action.type) {
    case StateType.Loaded:
      return initialState;
    case StateType.Loading:
      return {
        state: StateType.Loading,
        errorMessage: "",
      };
    case StateType.Error:
      return {
        state: StateType.Error,
        errorMessage: action.message || "Unknown error",
      };
  }
};

const UrlForm = ({ onAdd }: { onAdd: (link: ILink) => void }) => {
  const [formValue, setFormValue] = useState("");
  const [dataState, dispatch] = useReducer(dataReducer, initialState);

  const addUrl = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch({ type: StateType.Loading });

    if (isValidUri(formValue)) {
      const result = await fetch("/api/link", {
        method: "POST",
        body: formValue,
      });
      if (result.ok) {
        dispatch({ type: StateType.Loaded });
        const link = await result.json();
        onAdd(link);
        setFormValue("");
      } else {
        dispatch({ type: StateType.Error, message: "Unable to register Link" });
      }
    } else {
      dispatch({ type: StateType.Error, message: "Invalid URI" });
    }
  };

  return (
    <div className="">
      <form onSubmit={addUrl} className="w-full">
        <div className="flex items-center border-b border-yellow-500 py-1">
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            placeholder="https://example.com"
          />
          <button
            type="submit"
            className="flex-shrink-0 bg-yellow-500 hover:bg-yellow-700 border-yellow-500 hover:border-yellow-700 text-sm border-4 text-white py-1 px-2 rounded"
          >
            Submit
          </button>
        </div>
        {dataState?.state === StateType.Error ? (
          <div className="text-red-500 pt-2">{dataState.errorMessage}</div>
        ) : null}
      </form>
    </div>
  );
};

export default UrlForm;
