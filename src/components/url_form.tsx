import { useReducer, useState } from "react";
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

const UrlForm = () => {
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
      } else {
        dispatch({ type: StateType.Error, message: "Unable to register Link" });
      }
    } else {
      dispatch({ type: StateType.Error, message: "Invalid Link" });
    }
  };

  return (
    <div className="w-full max-w-sm">
      <form onSubmit={addUrl}>
        {dataState?.state === StateType.Error ? (
          <span>{dataState.errorMessage}</span>
        ) : null}
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UrlForm;
