'use client';

import React, { useState } from 'react';
import CategoryUseCaseBar from '@/components/CategoryUseCaseBar';
import { getTopUseCases, ProductType } from '@/lib/categoryFeedback';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function TestUseCasePage() {
  const [selectedProductType, setSelectedProductType] = useState<ProductType>('dimmer');
  
  const useCases = getTopUseCases(selectedProductType, 10);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>使用场景满意度分析测试页面</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              当前产品类型: <strong>{selectedProductType === 'dimmer' ? 'Dimmer Switches' : 'Light Switches'}</strong>
            </p>
            <p className="text-sm text-gray-600">
              使用场景数量: <strong>{useCases.length}</strong>
            </p>
          </div>
          
          <CategoryUseCaseBar 
            data={useCases}
            title={`${selectedProductType === 'dimmer' ? 'Dimmer' : 'Light'} Switches - Use Case Analysis`}
            description="Bar height shows mention frequency, color indicates satisfaction level"
            productType={selectedProductType}
            onProductTypeChange={setSelectedProductType}
          />
        </CardContent>
      </Card>
    </div>
  );
} 