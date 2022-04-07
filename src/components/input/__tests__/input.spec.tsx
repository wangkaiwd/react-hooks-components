import { render } from '@testing-library/react';
import Input from '../input';

describe('Input', () => {
  it('should render', () => {
    const { container } = render(<Input/>);
    expect(container.querySelector('input')).toBeInTheDocument();
  });
  it('should support all attributes of native input', () => {

  });
});
