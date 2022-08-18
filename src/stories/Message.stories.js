import Message from '../components/generic/Message/Message';

export default {
  title: 'Messages',
  component: Message,
};

const Template = (args) => <Message {...args} />;

export const ErrorMessage = Template.bind({});

ErrorMessage.args = {
  color: 'red',
  message: 'Write your message',
  fontSize: 20,
  backgroundColor: '',
  fontStyle: 'normal',
};

export const WarningMessage = Template.bind({});

WarningMessage.args = {
  color: 'yellow',
  message: 'Warning',
  fontSize: 20,
  backgroundColor: '#574a4a',
  fontStyle: 'italic',
};
