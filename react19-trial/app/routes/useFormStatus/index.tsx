import { useFormStatus } from "react-dom";
import { sleep } from "../../utils/timer";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  inputName: string;
};

const Form = ({ inputName }: Props) => {
  const { pending, data, method, action } = useFormStatus();

  return (
    <div
      style={{
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div>isPending: {pending ? "Loding" : "None"}</div>
      <div>data: {data ? `inputData=${data.get(inputName)}` : ""}</div>
      <div>mehtod: {method}</div>
      <div>
        <button
          disabled={pending}
          onClick={() => {
            if (typeof action === "string") {
              console.log(action);
              return;
            }
            if (!data) {
              return;
            }

            action(data);
          }}
        >
          Action
        </button>
      </div>
      <div>
        data: <input type="text" name={inputName} />
      </div>
      <button disabled={pending} type="submit">
        送信
      </button>
    </div>
  );
};

const FormStatus = () => {
  return (
    <div>
      <ErrorBoundary fallback={<p>Error</p>}>
        <div>
          <h2>GET</h2>
          <form
            action={async (formData) => {
              console.log(formData);

              await sleep(1000);
            }}
          >
            <Form inputName="GetInputData" />
          </form>
        </div>

        <div>
          <h2>POST</h2>
          <form
            method="POST"
            action={async (formData) => {
              console.log(formData);

              await sleep(1000);
            }}
          >
            <Form inputName="PostInputData" />
          </form>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default FormStatus;
