import React from 'react';
import styles from './Svg.module.scss';
import { Link } from 'react-router-dom';
import type { VectorProps, LogoProps, CrossProps } from '../../interfaces/interface';

export const VerticalLayoutVector = ({ handler }: { handler: () => void }): React.JSX.Element => {
    return (
        <svg
            className={styles.vertical_layout}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            onClick={handler}
        >
            <path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5-1v12H14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm-1 0H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h5.5z" />
        </svg>
    );
};

export const HorizontLayoutVector = ({ handler }: { handler: () => void }): React.JSX.Element => {
    return (
        <svg
            className={styles.horizont_layout}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            onClick={handler}
        >
            <path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5-1v12H14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm-1 0H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h5.5z" />
        </svg>
    );
};

export const Vector = (props: VectorProps): React.JSX.Element => {
    const { isOpen, className } = props;

    return <div className={`${styles.vector} ${!isOpen ? styles.vector_active : ''} ${className || ''}`}></div>;
};

export const Phone = (): React.JSX.Element => {
    return (
        <a className={styles.phone_link} href="tel: +74992887610">
            <svg
                className={styles.phone}
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 578.106 578.106"
            >
                <g>
                    <g>
                        <path
                            d="M577.83,456.128c1.225,9.385-1.635,17.545-8.568,24.48l-81.396,80.781
                c-3.672,4.08-8.465,7.551-14.381,10.404c-5.916,2.857-11.729,4.693-17.439,5.508c-0.408,0-1.635,0.105-3.676,0.309
                c-2.037,0.203-4.689,0.307-7.953,0.307c-7.754,0-20.301-1.326-37.641-3.979s-38.555-9.182-63.645-19.584
                c-25.096-10.404-53.553-26.012-85.376-46.818c-31.823-20.805-65.688-49.367-101.592-85.68
                c-28.56-28.152-52.224-55.08-70.992-80.783c-18.768-25.705-33.864-49.471-45.288-71.299
                c-11.425-21.828-19.993-41.616-25.705-59.364S4.59,177.362,2.55,164.51s-2.856-22.95-2.448-30.294
                c0.408-7.344,0.612-11.424,0.612-12.24c0.816-5.712,2.652-11.526,5.508-17.442s6.324-10.71,10.404-14.382L98.022,8.756
                c5.712-5.712,12.24-8.568,19.584-8.568c5.304,0,9.996,1.53,14.076,4.59s7.548,6.834,10.404,11.322l65.484,124.236
                c3.672,6.528,4.692,13.668,3.06,21.42c-1.632,7.752-5.1,14.28-10.404,19.584l-29.988,29.988c-0.816,0.816-1.53,2.142-2.142,3.978
                s-0.918,3.366-0.918,4.59c1.632,8.568,5.304,18.36,11.016,29.376c4.896,9.792,12.444,21.726,22.644,35.802
                s24.684,30.293,43.452,48.653c18.36,18.77,34.68,33.354,48.96,43.76c14.277,10.4,26.215,18.053,35.803,22.949
                c9.588,4.896,16.932,7.854,22.031,8.871l7.648,1.531c0.816,0,2.145-0.307,3.979-0.918c1.836-0.613,3.162-1.326,3.979-2.143
                l34.883-35.496c7.348-6.527,15.912-9.791,25.705-9.791c6.938,0,12.443,1.223,16.523,3.672h0.611l118.115,69.768
                C571.098,441.238,576.197,447.968,577.83,456.128z"
                        />
                    </g>
                </g>
            </svg>
            <span>+7 (499) 288-76-10</span>
        </a>
    );
};

export const Logo = ({ className }: LogoProps): React.JSX.Element => {
    return (
        <Link className={styles.logo_link} to={'/'}>
            <svg
                className={className}
                width="312"
                height="79"
                viewBox="0 0 312 79"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g clipPath="url(#clip0_960_6285)">
                    <path
                        d="M141.249 51.7095V42.5195C141.249 42.2295 141.209 41.9595 141.029 41.6795L132.059 25.6895H138.419C140.429 29.6195 143.039 34.8395 144.339 37.6595C145.469 34.9295 148.319 29.4595 150.289 25.6895H156.169L147.089 41.5895C146.979 41.7695 146.879 41.8895 146.879 42.4195V51.6995H141.249V51.7095Z"
                        fill="white"
                        data-light
                    />
                    <path
                        d="M181.9 38.6193C181.9 45.8593 177.55 52.0893 169.1 52.0893C160.65 52.0893 156.66 46.1593 156.66 38.7093C156.66 31.2593 161.38 25.3193 169.46 25.3193C177.07 25.3193 181.89 30.6493 181.89 38.6193H181.9ZM162.48 38.5993C162.48 43.6793 164.71 47.5193 169.32 47.5193C174.32 47.5193 176.09 43.3293 176.09 38.6893C176.09 33.7693 174.07 29.8993 169.22 29.8993C164.37 29.8993 162.47 33.5293 162.47 38.5893L162.48 38.5993Z"
                        fill="white"
                        data-light
                    />
                    <path
                        d="M192.138 25.6992V41.1992C192.138 46.1892 194.708 47.6692 197.508 47.6692C200.728 47.6692 202.748 45.9192 202.748 41.1992V25.6992H208.378V40.9192C208.378 49.8192 203.168 52.0792 197.438 52.0792C191.708 52.0792 186.508 49.7092 186.508 41.0292V25.6992H192.138Z"
                        fill="white"
                        data-light
                    />
                    <path
                        d="M217.638 45.7092L215.608 51.7192H210.078L218.908 25.6992H225.978L235.198 51.7192H229.288L227.148 45.7092H217.648H217.638ZM225.928 41.0992C224.078 35.6092 222.908 32.0992 222.278 29.7592H222.238C221.598 32.3192 220.298 36.4092 218.818 41.0992H225.928Z"
                        fill="#D5D5D5"
                        data-dark
                    />
                    <path
                        d="M243.177 25.6992V41.1992C243.177 46.1892 245.747 47.6692 248.547 47.6692C251.767 47.6692 253.787 45.9192 253.787 41.1992V25.6992H259.417V40.9192C259.417 49.8192 254.207 52.0792 248.477 52.0792C242.747 52.0792 237.547 49.7092 237.547 41.0292V25.6992H243.177Z"
                        fill="#D5D5D5"
                        data-dark
                    />
                    <path
                        d="M271.056 30.3092H263.156V25.6992H284.566V30.3092H276.686V51.7192H271.056V30.3092Z"
                        fill="#D5D5D5"
                        data-dark
                    />
                    <path
                        d="M311.17 38.6193C311.17 45.8593 306.82 52.0893 298.37 52.0893C289.92 52.0893 285.93 46.1593 285.93 38.7093C285.93 31.2593 290.65 25.3193 298.73 25.3193C306.34 25.3193 311.16 30.6493 311.16 38.6193H311.17ZM291.75 38.5993C291.75 43.6793 293.98 47.5193 298.59 47.5193C303.59 47.5193 305.36 43.3293 305.36 38.6893C305.36 33.7693 303.34 29.8993 298.49 29.8993C293.64 29.8993 291.74 33.5293 291.74 38.5893L291.75 38.5993Z"
                        fill="#D5D5D5"
                        data-dark
                    />
                    <path
                        d="M34.6184 51.6898C31.6184 46.4398 24.9284 44.6198 19.6784 47.6298C14.4284 50.6298 12.6084 57.3198 15.6184 62.5698C18.6284 67.8198 25.3084 69.6398 30.5584 66.6298C35.8084 63.6298 37.6284 56.9398 34.6184 51.6898ZM26.9984 48.8398C28.6484 49.2098 30.1484 50.0698 31.3084 51.3098C30.1484 52.8098 29.0984 53.5198 27.2884 54.5998L26.1284 53.9298C26.1684 51.8398 26.2684 50.5798 26.9884 48.8498L26.9984 48.8398ZM20.8884 49.7498C21.6184 49.3298 22.3884 49.0298 23.1684 48.8498C23.8884 50.6098 23.9784 51.8698 24.0084 53.9698L22.8484 54.6398C21.0584 53.5598 20.0184 52.8398 18.8784 51.3498C19.4684 50.7198 20.1484 50.1798 20.8984 49.7498H20.8884ZM16.9884 59.6498C16.4884 58.0298 16.4784 56.2998 16.9684 54.6798C18.8484 54.9298 19.9884 55.4798 21.8284 56.5198V57.8598C19.9884 58.8698 18.8484 59.4198 16.9884 59.6598V59.6498ZM23.2284 65.4298C21.5784 65.0598 20.0784 64.1998 18.9184 62.9598C20.0784 61.4598 21.1284 60.7498 22.9384 59.6698L24.0984 60.3398C24.0584 62.4298 23.9584 63.6898 23.2384 65.4198L23.2284 65.4298ZM25.8484 58.4298C25.1384 58.8398 24.2284 58.5898 23.8184 57.8798C23.4084 57.1698 23.6584 56.2598 24.3684 55.8498C25.0784 55.4398 25.9884 55.6898 26.3984 56.3998C26.8084 57.1098 26.5584 58.0198 25.8484 58.4298ZM29.3384 64.5198C28.6084 64.9398 27.8384 65.2398 27.0584 65.4198C26.3384 63.6698 26.2484 62.3998 26.2184 60.2898L27.3784 59.6298C29.1684 60.7098 30.2084 61.4298 31.3484 62.9198C30.7584 63.5498 30.0784 64.0898 29.3284 64.5198H29.3384ZM33.2584 59.5898C31.3784 59.3398 30.2384 58.7898 28.3984 57.7498V56.4098C30.2384 55.3998 31.3784 54.8498 33.2384 54.6098C33.7384 56.2298 33.7484 57.9598 33.2584 59.5798V59.5898ZM37.5484 52.7498C32.6284 42.5798 30.8884 31.6198 32.6384 21.8598C34.3284 12.3698 39.1384 5.09977 46.1984 1.25977C45.3884 1.53977 44.5784 1.85977 43.7984 2.23977C36.6684 5.68977 32.1284 12.7998 30.5184 21.5498C28.1484 21.6398 26.6084 21.6898 26.4184 21.6698C25.4184 21.6098 24.6784 19.7298 23.0684 19.7998C23.0684 19.7998 23.6084 21.2798 23.3384 21.4798C23.0684 21.6798 9.00842 21.4798 9.00842 21.4798C9.00842 21.4798 8.19842 22.8098 9.53842 23.1598C10.8884 23.4898 11.1584 25.7298 11.1584 25.7298L1.98842 35.0398H12.4384V38.3298C12.4384 38.3298 8.28842 38.3298 7.20842 39.3298C6.12842 40.3298 5.84842 41.1898 5.84842 41.1898C5.84842 41.1898 2.26842 40.1898 1.40842 41.1898C0.54842 42.1898 -0.89158 52.2098 0.69842 52.7898C2.26842 53.3598 2.26842 53.5198 2.49842 53.9798C2.73842 54.4498 3.01842 56.9698 5.14842 57.0298C5.47842 57.0398 8.42842 57.0898 13.1684 57.1698C13.1584 57.0998 13.1584 57.0098 13.1584 56.9398C13.1584 50.3498 18.5184 44.9898 25.0984 44.9898C28.6984 44.9898 31.9184 46.5998 34.1084 49.1198C34.4884 50.0298 34.8884 50.9298 35.3284 51.8298C40.7384 63.0198 49.1284 71.3298 57.9984 75.3898C49.7784 70.7498 42.3784 62.7698 37.5384 52.7398L37.5484 52.7498ZM13.8784 47.5098C13.2684 48.1998 12.7384 48.9598 12.2384 49.7798L12.1484 49.7498C13.0684 45.9698 16.8284 42.9898 20.7184 42.9698L20.7384 43.1298C18.0784 43.9398 15.6784 45.4098 13.8684 47.5198L13.8784 47.5098ZM26.7984 33.6498H11.4184L18.7984 23.7498H29.1184L26.7984 33.6498Z"
                        fill="#D5D5D5"
                        data-dark
                    />
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M97.8671 51.2998C97.2171 62.4498 92.2671 71.8198 83.6171 75.9998C80.5271 77.4898 77.2171 78.2098 73.8171 78.2098C73.0871 78.2098 72.3471 78.1798 71.6071 78.1098C59.3571 77.0698 46.3871 67.2398 39.0371 52.0398C29.1971 31.6598 33.1871 9.35977 47.9671 2.21977C50.2071 1.13977 52.5671 0.469766 54.9971 0.179766C55.9271 0.0697656 56.8671 0.00976562 57.8171 0.00976562C70.6771 0.00976562 84.7571 10.0898 92.5471 26.1898C93.4771 28.1198 94.2871 30.0698 94.9671 32.0198H88.6971C88.2671 30.9198 87.7871 29.8198 87.2671 28.7398C83.9071 21.7898 79.1771 15.9298 73.5871 11.7798C68.4671 7.97976 62.8771 5.87977 57.8271 5.87977C57.1171 5.87977 56.3971 5.91977 55.7071 6.00977C53.8871 6.22977 52.1471 6.71977 50.5371 7.49977C45.1271 10.1198 41.3971 15.6898 40.0571 23.1998C38.5871 31.3998 40.1071 40.7398 44.3271 49.4898C50.4871 62.2198 61.6471 71.3798 72.1071 72.2698C72.6971 72.3198 73.2671 72.3498 73.8171 72.3498C76.3971 72.3498 78.8371 71.7998 81.0571 70.7298C84.3071 69.1598 86.9471 66.5198 88.8171 63.0398H86.7771C87.4271 62.7198 88.7271 61.4998 90.2071 59.9498L97.8671 51.3198V51.2998ZM120.887 55.2498C120.887 57.1998 118.937 58.1398 117.067 58.5998C116.877 58.6498 115.647 58.6698 113.577 58.6698C113.657 58.1098 113.697 57.5298 113.697 56.9498C113.697 50.3598 108.337 44.9998 101.757 44.9998C95.1771 44.9998 89.8071 50.3598 89.8071 56.9498C89.8071 57.4598 89.8371 57.9498 89.8971 58.4398C89.1471 58.4298 88.3771 58.4198 87.6071 58.4098C86.0671 62.8898 83.3471 66.3998 79.4871 68.2598C77.4971 69.2198 75.3471 69.6798 73.1171 69.6798C63.5871 69.6798 52.6071 61.2798 46.2671 48.1498C38.4471 31.9698 40.6371 14.7198 51.1671 9.63977C53.1571 8.67977 55.3071 8.21977 57.5371 8.21977C63.9571 8.21977 71.0271 12.0198 76.8871 18.5098C76.8871 18.5098 76.8871 18.5098 76.8571 18.5098C76.5371 18.4198 73.5571 17.5598 70.2171 16.8198C67.2471 16.1598 63.9971 15.5998 62.1071 15.7498L64.6171 13.2798C62.2271 12.1598 59.8271 11.5698 57.5271 11.5698C55.7571 11.5698 54.1171 11.9298 52.6171 12.6498C49.5671 14.1198 47.3271 17.0298 46.0671 20.9898C55.7871 20.6898 65.7971 20.4898 67.4771 20.9198C70.8271 21.7898 85.5671 33.1798 85.5671 33.1798C95.0871 34.3198 107.067 35.1298 112.637 36.1898C115.597 36.7598 117.477 38.6698 118.727 40.4198L114.897 41.0098C114.897 41.0098 116.077 39.7698 112.967 39.8998C109.857 40.0298 107.767 39.4898 107.377 39.8998C106.987 40.2998 106.267 40.8198 108.747 41.0198C111.227 41.2198 112.407 41.2798 112.507 41.5398C112.607 41.7998 111.557 43.4398 111.557 43.4398H120.657C120.727 43.5298 120.797 43.5998 120.867 43.6398C121.807 44.2398 120.867 53.2798 120.867 55.2298L120.887 55.2498ZM45.7971 36.5998C45.7371 36.3098 45.6771 36.0098 45.6171 35.7198C45.6771 36.0098 45.7271 36.3098 45.7971 36.5998ZM50.2471 33.6398L47.9171 23.7398H45.3971C45.4771 23.2898 45.5771 22.8498 45.6771 22.4298C45.4671 23.2998 45.2971 24.2098 45.1771 25.1698C44.8371 27.8598 44.8871 30.7198 45.2871 33.6398H50.2471ZM56.6171 33.6398H78.1571L64.4871 23.7398H54.2871L56.6171 33.6398ZM84.0271 58.3598C75.5471 58.2398 66.2071 58.0898 57.0171 57.9398C61.9971 63.1498 67.8271 66.3298 73.1171 66.3298C74.8871 66.3298 76.5271 65.9698 78.0271 65.2498C80.7371 63.9398 82.7371 61.5098 84.0171 58.3598H84.0271ZM85.6371 50.5098C85.4971 53.4098 84.9571 56.0698 84.0271 58.3598C84.9571 56.0698 85.5071 53.4098 85.6371 50.5098ZM97.7571 43.1098L97.7371 42.9498C93.8471 42.9798 90.0871 45.9498 89.1671 49.7298L89.2571 49.7598C89.7571 48.9498 90.2871 48.1798 90.8971 47.4898C92.7071 45.3798 95.1071 43.9098 97.7671 43.0998L97.7571 43.1098ZM111.257 51.6898C114.257 56.9398 112.447 63.6298 107.197 66.6298C103.467 68.7598 99.0171 68.4498 95.6771 66.2198C96.0571 65.4898 96.4171 64.7498 96.7471 63.9798C97.6771 64.6598 98.7471 65.1698 99.8871 65.4298C100.607 63.6998 100.707 62.4398 100.747 60.3498L99.5871 59.6798C98.9471 60.0598 98.3971 60.3998 97.9071 60.7398C98.5071 58.7698 98.9571 56.6798 99.2371 54.4898L99.6871 48.8998L99.8171 46.6098L95.9771 50.9298L95.5571 51.3998L90.8271 56.7298C90.9671 53.0798 92.9171 49.5798 96.3171 47.6298C101.567 44.6298 108.257 46.4398 111.257 51.6898ZM102.777 53.9198L103.937 54.5898C105.747 53.5098 106.797 52.7998 107.957 51.2998C106.797 50.0698 105.297 49.2098 103.647 48.8298C102.927 50.5598 102.827 51.8198 102.787 53.9098L102.777 53.9198ZM103.047 56.3898C102.637 55.6798 101.727 55.4298 101.017 55.8398C100.307 56.2498 100.057 57.1598 100.467 57.8698C100.877 58.5798 101.787 58.8298 102.497 58.4198C103.207 58.0098 103.457 57.0998 103.047 56.3898ZM107.997 62.9098C106.857 61.4198 105.817 60.6998 104.027 59.6198L102.867 60.2798C102.897 62.3898 102.987 63.6498 103.707 65.3998C104.487 65.2198 105.257 64.9198 105.987 64.4998C106.737 64.0698 107.417 63.5298 108.007 62.8998L107.997 62.9098ZM109.877 54.6198C108.017 54.8598 106.877 55.3998 105.047 56.4198V57.7598C106.877 58.7898 108.017 59.3398 109.897 59.5998C110.387 57.9798 110.377 56.2498 109.877 54.6298V54.6198Z"
                        fill="white"
                        data-light
                    />
                </g>
                <defs>
                    <clipPath id="clip0_960_6285">
                        <rect width="311.17" height="78.2" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </Link>
    );
};

export const Cross = (props: CrossProps): React.JSX.Element => {
    const { handler, className } = props;

    return <div className={`${styles.cross} ${className}`} onClick={handler}></div>;
};

export const Heart = ({ customClass }: { customClass?: string }): React.JSX.Element => {
    return (
        <svg
            className={`${customClass || ''} ${styles.heart}`}
            height="100"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="none"
                strokeWidth="2"
            />
        </svg>
    );
};