export default function Footer() {
    return (
        <div className="text-center p-4 bg-dark text-light mt4">
            <h4 className="mt-4">
                Prop Rent App - Buy, Sell or Rent Properties
            </h4>
            <p className="mt-3">
                &copy; {new Date().getFullYear} All right reserved
            </p>
        </div>
    );
}
