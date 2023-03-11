export function formatNumber(price) {
    return price?.toLocaleString("en-US", { style: "decimal" });
}
