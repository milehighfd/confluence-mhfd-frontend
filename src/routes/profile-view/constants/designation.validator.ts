export const isAdminOrStaff = (appUser: any) => {
    return appUser.designation !== 'guest' && appUser.designation === 'admin' || appUser.designation === 'staff' || appUser.designation === 'government_staff'
};