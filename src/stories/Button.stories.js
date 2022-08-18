import Button from '../components/generic/Button/Button';

export default {
  title: 'Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  text: '+',
  backgroundColor: 'rgb(128, 130, 8)',
  color: 'white',
  size: 'md',
};

export const Secondary = Template.bind({});

Secondary.args = {
  text: 'Secondary',
  backgroundColor: 'grey',
  color: 'white',
  size: 'sm',
};
