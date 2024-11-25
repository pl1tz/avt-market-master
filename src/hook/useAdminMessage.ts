import { message } from 'antd';

export type UseMessage = () => {
    showSuccess: MessageFunction;
    showError: MessageFunction;
    contextHolder: React.ReactNode;
};
export type MessageFunction = (content: string) => void;

export const useMessageAdmin: UseMessage = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const showSuccess = (content: string): void => {
        messageApi.success(content);
    };

    const showError = (content: string): void => {
        messageApi.error(content);
    };

    return { showSuccess, showError, contextHolder };
};
