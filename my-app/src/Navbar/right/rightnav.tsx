import Calendar from '../../component/calendar';
import './rigth.css'
const RightNav = () => {
    return (
        <>
            <div className="header">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="16" fill="#FFF2E7" />
                    <path d="M22.1167 18.0753L21.2833 16.692C21.1083 16.3837 20.95 15.8003 20.95 15.4587V13.3503C20.95 11.392 19.8 9.70033 18.1417 8.90866C17.7083 8.14199 16.9083 7.66699 15.9917 7.66699C15.0833 7.66699 14.2667 8.15866 13.8333 8.93366C12.2083 9.74199 11.0833 11.417 11.0833 13.3503V15.4587C11.0833 15.8003 10.925 16.3837 10.75 16.6837L9.90833 18.0753C9.57499 18.6337 9.49999 19.2503 9.70833 19.817C9.90833 20.3753 10.3833 20.8087 11 21.017C12.6167 21.567 14.3167 21.8337 16.0167 21.8337C17.7167 21.8337 19.4167 21.567 21.0333 21.0253C21.6167 20.8337 22.0667 20.392 22.2833 19.817C22.5 19.242 22.4417 18.6087 22.1167 18.0753Z" fill="#FFAC6A" />
                    <path d="M18.3584 22.6753C18.0084 23.642 17.0834 24.3337 16 24.3337C15.3417 24.3337 14.6917 24.067 14.2334 23.592C13.9667 23.342 13.7667 23.0087 13.65 22.667C13.7584 22.6837 13.8667 22.692 13.9834 22.7087C14.175 22.7337 14.375 22.7587 14.575 22.7753C15.05 22.817 15.5334 22.842 16.0167 22.842C16.4917 22.842 16.9667 22.817 17.4334 22.7753C17.6084 22.7587 17.7834 22.7503 17.95 22.7253C18.0834 22.7087 18.2167 22.692 18.3584 22.6753Z" fill="#FFAC6A" />
                </svg>
                <div className="user-avt">
                    <img src="./images/user-avt.png" alt="User Avatar" />
                </div>
                <div className="user-title">
                    <p className='hello'>Xin chào</p>
                    <p className="user-name">Lê Quỳnh Ái Vân</p>
                </div>
            </div>
            <div className='r-title'>
                <p>Tổng quan</p>
                <div className='figure'>
                    <a href="#">
                        {/* device section */}
                        <div className='device'>
                            <img src="./images/tron1.png" alt="Device" />
                            <p className='number'>4.221</p>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.75663 1.16699H10.2375C12.3141 1.16699 12.8333 1.68616 12.8333 3.75699V7.44949C12.8333 9.52616 12.3141 10.0395 10.2433 10.0395H3.75663C1.68579 10.0453 1.16663 9.52616 1.16663 7.45533V3.75699C1.16663 1.68616 1.68579 1.16699 3.75663 1.16699Z" stroke="#FF7506" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M7 10.0449V12.8333" stroke="#FF7506" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M1.16663 7.58301H12.8333" stroke="#FF7506" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M4.375 12.833H9.625" stroke="#FF7506" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p className='d-title'>Thiết bị</p>
                            <div className='d-list-active'>
                                <ul>
                                    <li className='d-active'><span style={{ color: "#7e7d88" }}>Đang hoạt động </span></li><p className='d-p-active'>3.799</p>
                                    <li className='d-un-active'><span>Ngưng hoạt động </span></li><p className='d-p-un'>422</p>
                                </ul>
                            </div>
                        </div>
                        {/* service section */}
                        <div className='service'>
                            <img src="./images/tron2.png" alt="service" />
                            <p className='number'>4.221</p>
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <ellipse cx="3.22131" cy="10.0817" rx="0.498165" ry="0.495793" fill="#4277FF" />
                                <ellipse cx="4.88171" cy="10.0817" rx="0.498165" ry="0.495793" fill="#4277FF" />
                                <ellipse cx="6.54236" cy="10.0817" rx="0.498165" ry="0.495793" fill="#4277FF" />
                                <g clip-path="url(#clip0_233_8328)">
                                    <path d="M9.63057 3.8252C9.96328 3.8252 10.2657 3.91953 10.527 4.12707C11.0219 4.52599 11.0934 5.20252 10.6782 5.68229C10.549 5.83323 10.395 5.968 10.2492 6.10277C10.0678 6.26988 9.93578 6.45047 9.94678 6.71461C9.95503 6.90598 9.7928 7.03266 9.60307 7.02727C9.42434 7.01919 9.3006 6.88172 9.29236 6.69035C9.27586 6.33996 9.39959 6.04347 9.64156 5.7928C9.80654 5.6203 9.98802 5.46666 10.1503 5.29147C10.373 5.05428 10.3235 4.74431 10.0375 4.57989C9.94953 4.52868 9.84229 4.49364 9.7378 4.48017C9.40784 4.43974 9.11088 4.53946 8.98439 4.95724C8.93215 5.13514 8.74792 5.22678 8.57744 5.17557C8.39871 5.12435 8.30522 4.95455 8.35472 4.76857C8.5032 4.19176 8.99539 3.82789 9.63057 3.8252Z" fill="#4277FF" />
                                    <path d="M9.633 7.36051C9.81997 7.3659 9.95746 7.50876 9.95196 7.68665C9.94646 7.86993 9.79523 8.0047 9.6055 7.99661C9.42402 7.98853 9.28654 7.84298 9.29479 7.66509C9.30029 7.48719 9.44602 7.35512 9.633 7.36051Z" fill="#4277FF" />
                                </g>
                                <path d="M14.7704 5.7304C14.7704 7.04284 14.0591 8.22267 12.9266 9.04368C12.8874 9.07098 12.8658 9.11778 12.8639 9.16459L12.8149 10.4419C12.809 10.6135 12.6189 10.713 12.4739 10.6213L11.3864 9.94074C11.3864 9.94074 11.3864 9.94074 11.3845 9.94074C11.3218 9.89978 11.2453 9.88808 11.1748 9.90954C10.5282 10.1104 9.82472 10.2216 9.08797 10.2216C9.07817 10.2216 9.06837 10.2216 9.05857 10.2216C9.07817 10.0928 9.08797 9.96219 9.08797 9.82958C9.08797 7.99841 7.2108 6.51436 4.89472 6.51436C4.41857 6.51436 3.96201 6.57676 3.53485 6.69182C3.44863 6.38175 3.40356 6.05802 3.40356 5.7265C3.40356 3.24398 5.94695 1.2334 9.08601 1.2334C12.227 1.2373 14.7704 3.24983 14.7704 5.7304Z" stroke="#4277FF" stroke-width="1.10526" stroke-miterlimit="10" />
                                <path d="M3.53675 6.69531C1.88884 7.14189 0.703369 8.37828 0.703369 9.83308C0.703369 10.8003 1.22851 11.6721 2.06324 12.2785C2.09263 12.3 2.1083 12.3331 2.11026 12.3682L2.14553 13.3102C2.14945 13.4369 2.29053 13.5091 2.3983 13.4428L3.20168 12.9396C3.20756 12.9357 3.2154 12.9299 3.22128 12.926C3.25067 12.9026 3.28986 12.8948 3.32513 12.9065C3.81108 13.0625 4.34013 13.1483 4.89662 13.1483C7.04419 13.1483 8.81555 11.871 9.06048 10.2251" stroke="#4277FF" stroke-width="1.10526" stroke-miterlimit="10" />
                                <defs>
                                    <clipPath id="clip0_233_8328">
                                        <rect width="2.60944" height="4.1751" fill="white" transform="translate(8.34058 3.82422)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <p className='s-title'>Dịch vụ</p>
                            <div className='s-list-active'>
                                <ul>
                                    <li className='s-active'><span style={{ color: "#7e7d88" }}>Đang hoạt động </span></li><p className='s-p-active'>3.799</p>
                                    <li className='s-un-active'><span>Ngưng hoạt động </span></li><p className='s-p-un'>422</p>
                                </ul>
                            </div>
                        </div>
                        {/* Number section */}
                        <div className='number-level'>
                            <img src="./images/tron3.png" alt="number level" />
                            <p className='number'>4.221</p>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_233_8368)">
                                    <path d="M1.16675 9.91699L7.00008 12.8337L12.8334 9.91699" stroke="#35C75A" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M1.16675 7L7.00008 9.91667L12.8334 7" stroke="#35C75A" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7.00008 1.16699L1.16675 4.08366L7.00008 7.00033L12.8334 4.08366L7.00008 1.16699Z" stroke="#35C75A" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_233_8368">
                                        <rect width="14" height="14" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                            <p className='n-title'>Cấp số</p>
                            <div className='n-list-active'>
                                <ul>
                                    <li className='n-active'><span style={{ color: "#7e7d88" }}>Đang hoạt động </span></li><p className='n-p-active'>3.799</p>
                                    <li className='n-un-active'><span>Ngưng hoạt động </span></li><p className='n-p-un'>422</p>
                                    <li className='n-skip'><span style={{ color: "#7e7d88" }}>Bỏ qua </span></li><p className='n-p-skip'>32</p>
                                </ul>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <Calendar/>
        </>
    )

}
export default RightNav;