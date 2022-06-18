import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import * as actions from './actions';
import { selectors } from './reducer';
import { getProductsCount } from '../../global/helpers';
import styles from './ProductsPage.module.scss';
import Loader from '../../components/Loader';
import ProductCard from '../../components/ProductCard';
import { ProductCardVariant } from '../../components/ProductCard/ProductCard';
import ProductsBreadCrumbs from '../../components/Breadcrumbs/ProductsBreadCrumbs';

const ProductsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const params = new URLSearchParams(useLocation().search);
  const searchValue = params.get('search');
  const categoryId = params.get('categoryId');
  const categoryName = params.get('categoryName');

  const loading = useSelector(selectors.productsPageLoading);
  const data = useSelector(selectors.productsPageData);
  const sortedData = data
    ? data.slice().sort((_a, b) => (b.price ? 1 : -1))
    : data;

  useEffect(() => {
    if (searchValue) {
      dispatch(actions.getProductsBySearchValue.request(searchValue));
    } else if (categoryId) {
      dispatch(actions.getProductsByCategoryId.request(categoryId));
    }
  }, [dispatch, searchValue, categoryId]);

  const pageContent = (
    <>
      {sortedData && (
        <>
          <div className={styles.topBlock}>
            <div className={styles.header}>
              <div className={styles.headerText}>
                {searchValue ? (
                  <>
                    {sortedData.length
                      ? t('ProductsPage.TITLE_TEXT')
                      : t('ProductsPage.NOTHING_FOUND')}{' '}
                    <br />“{searchValue}”
                  </>
                ) : (
                  <>
                    {categoryId && categoryName && (
                      <>
                        {!sortedData.length &&
                          t('ProductsPage.NOTHING_FOUND_IN_CATEGORY')}{' '}
                        {categoryName}
                      </>
                    )}
                  </>
                )}
              </div>
              <div className={styles.subheaderText}>
                {getProductsCount(sortedData.length)}{' '}
                {t('ProductsPage.SUBTITLE_TEXT')}
              </div>
            </div>
          </div>
          <div className={styles.cardsContainer}>
            {sortedData.map((product) => (
              <div key={product.id} className={styles.card}>
                <ProductCard variant={ProductCardVariant.SEARCH} {...product} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );

  return (
    <div className={styles.main}>
      <ProductsBreadCrumbs categoryName={categoryName} />
      {loading ? <Loader /> : pageContent}
    </div>
  );
};

export default ProductsPage;
