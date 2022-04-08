import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Input from '../input';

describe('Input', () => {
  it('should render correctly', () => {
    const input = renderer.create(<Input placeholder="Please input something..."/>).toJSON();
    expect(input).toMatchSnapshot();
  });
  it('should clear text within input', () => {
    const onChange = jest.fn();
    render(<Input onChange={onChange}/>);
    const input = screen.getByTestId<HTMLInputElement>('input');
    input.value = '20';
    fireEvent.click(screen.getByTestId('clear'));
    expect(onChange).toBeCalledTimes(1);
    expect(screen.getByTestId('input')).toHaveValue('');
  });
  it('should trigger change with parameter value', () => {
    const onChange = jest.fn();
    render(<Input onChange={onChange}/>);
    const input = screen.getByTestId('input');
    fireEvent.input(input, { target: { value: '10' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('10');
  });
  it('should support all attributes of native input', () => {
  });
});
