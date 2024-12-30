import { render } from "@testing-library/react-native";
import LoginForm from "@/components/LoginForm";

describe("<LoginForm />", () => {
  test("Should Render correct text", () => {
    const { getByText } = render(<LoginForm />);

    getByText("Email");
  });
});
