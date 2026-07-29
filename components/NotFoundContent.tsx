import RollLink from "@/components/RollLink";

export default function NotFoundContent() {
  return (
    <div className="notfound-main page-wrap">
      <div className="notfound-content">
        <h1 className="notfound-code">404</h1>
        <p className="notfound-message">PAGE NOT FOUND</p>
        <RollLink href="/" className="notfound-link">
          RETURN HOME
        </RollLink>
      </div>
    </div>
  );
}
