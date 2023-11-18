interface PurchasePage {
  params: {
    productId: string;
  }
}

const PurchasePage: React.FC<PurchasePage> = ({ params }) => {
  return (
    <div>
      {params.productId}
    </div>
  )
}